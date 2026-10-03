import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { Header } from './header';
import { routes } from '../../app.routes';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('includes the September 7 radio program in public information', () => {
    expect(component.publicInfoItems.some((item) => item.src === 'IP/Programa de Radio 7 de Septiembre.mp3')).toBe(true);
  });

  it('shows the requested title for the September 7 radio program', () => {
    component.currentAudioIndex = component.publicInfoItems.findIndex((item) => item.src === 'IP/Programa de Radio 7 de Septiembre.mp3');

    expect(component.currentPublicInfoTitle).toBe(component.language.t('radioProgramTitle'));
  });

  it('includes both new public information flyers', () => {
    const flyerSources = component.publicInfoItems
      .filter((item) => item.type === 'image')
      .map((item) => item.src);

    expect(flyerSources).toContain('IP/InvitacionServirenIP.jpeg');
    expect(flyerSources).toContain('IP/InfoIP1.jpeg');
    expect(flyerSources).toContain('IP/InfoIP2.jpeg');
    expect(flyerSources).not.toContain('Eventos/comiteRelacionesPublicas.jpeg');
  });

  it('navigates through public information with previous and next controls', () => {
    component.currentAudioIndex = 2;

    component.previousAudio();
    expect(component.currentAudioIndex).toBe(1);

    component.nextAudio();
    expect(component.currentAudioIndex).toBe(2);
  });

  it('wraps around when navigating before the first public information item', () => {
    component.currentAudioIndex = 0;

    component.previousAudio();

    expect(component.currentAudioIndex).toBe(component.publicInfoItems.length - 1);
  });

  it('does not include the removed August recordings in public information', () => {
    expect(component.publicInfoItems.some((item) => item.src.includes('Agosto'))).toBe(false);
  });

  it('opens the merchandise dialog when its route is activated', async () => {
    await TestBed.inject(Router).navigateByUrl('/mercaderia');

    expect(component.isMerchandiseOpen).toBe(true);
  });

  it('closes the merchandise dialog and returns to the home route', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/mercaderia');

    component.closeMerchandise();
    await fixture.whenStable();

    expect(router.url).toBe('/');
    expect(component.isMerchandiseOpen).toBe(false);
  });

  it('keeps the events carousel action when navigating to its route', async () => {
    const eventsRequested = vi.spyOn(component.eventsRequested, 'emit');

    await TestBed.inject(Router).navigateByUrl('/eventos');

    expect(eventsRequested).toHaveBeenCalledOnce();

    component.openEvents();

    expect(eventsRequested).toHaveBeenCalledTimes(2);
  });
});
