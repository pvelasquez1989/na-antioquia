import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, effect, inject, input, signal, viewChild } from '@angular/core';
import type { PDFDocumentLoadingTask, RenderTask } from 'pdfjs-dist';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.html',
  styleUrl: './pdf-preview.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfPreview {
  readonly src = input.required<string>();
  readonly title = input.required<string>();
  readonly language = inject(LanguageService);
  readonly isLoading = signal(true);
  readonly hasError = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly pagesContainer = viewChild<ElementRef<HTMLDivElement>>('pages');
  private readonly renderTasks: RenderTask[] = [];
  private loadingTask?: PDFDocumentLoadingTask;
  private requestId = 0;
  private lastRenderWidth = 0;

  constructor() {
    effect((onCleanup) => {
      const src = this.src();
      const container = this.pagesContainer()?.nativeElement;
      if (container) {
        const resizeObserver = new ResizeObserver(() => {
          const width = this.getRenderWidth(container);
          if (width > 0 && Math.abs(width - this.lastRenderWidth) > 1) {
            void this.renderDocument(this.src(), container);
          }
        });
        if (container.parentElement) {
          resizeObserver.observe(container.parentElement);
        }
        onCleanup(() => resizeObserver.disconnect());
        void this.renderDocument(src, container);
      }
    });

    inject(DestroyRef).onDestroy(() => this.cancelCurrentRender());
  }

  private async renderDocument(src: string, container: HTMLDivElement): Promise<void> {
    this.cancelCurrentRender();
    const requestId = ++this.requestId;
    container.replaceChildren();
    this.lastRenderWidth = this.getRenderWidth(container);
    this.isLoading.set(true);
    this.hasError.set(false);

    try {
      const pdfjs = await import('pdfjs-dist');
      if (requestId !== this.requestId) return;

      pdfjs.GlobalWorkerOptions.workerSrc = new URL('assets/pdf.worker.min.mjs', this.document.baseURI).toString();
      const loadingTask = pdfjs.getDocument({ url: src });
      this.loadingTask = loadingTask;
      const pdf = await loadingTask.promise;
      if (requestId !== this.requestId) return;

      const width = this.getRenderWidth(container);
      this.lastRenderWidth = width;
      const pixelRatio = Math.min(this.document.defaultView?.devicePixelRatio ?? 1, 2);

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        if (requestId !== this.requestId) return;

        const initialViewport = page.getViewport({ scale: 1 });
        const scale = width / initialViewport.width;
        const viewport = page.getViewport({ scale });
        const canvas = this.document.createElement('canvas');
        canvas.className = 'pdf-page';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', `${this.title()} — ${pageNumber}`);
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.display = 'block';
        canvas.style.maxWidth = '100%';
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = 'auto';
        canvas.style.flex = '0 0 auto';
        container.append(canvas);

        const renderTask = page.render({
          canvas,
          viewport,
          transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
        });
        this.renderTasks.push(renderTask);
        await renderTask.promise;
        if (requestId !== this.requestId) return;
      }
    } catch (error) {
      if (requestId !== this.requestId) return;
      console.error('Error al generar la vista previa del PDF:', error);
      this.hasError.set(true);
    } finally {
      if (requestId === this.requestId) {
        this.isLoading.set(false);
      }
    }
  }

  private cancelCurrentRender(): void {
    this.requestId++;
    for (const task of this.renderTasks) {
      task.cancel();
    }
    this.renderTasks.length = 0;

    if (this.loadingTask) {
      void this.loadingTask.destroy().catch((error: unknown) => {
        console.error('Error al liberar el visor PDF:', error);
      });
      this.loadingTask = undefined;
    }
  }

  private getRenderWidth(container: HTMLDivElement): number {
    return container.parentElement?.clientWidth ?? container.clientWidth;
  }
}
