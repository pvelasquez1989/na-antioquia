import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Group } from '../../data/groups.data';
import { GroupCard } from './group-card';

describe('GroupCard', () => {
  let component: GroupCard;
  let fixture: ComponentFixture<GroupCard>;
  const group: Group = {
    name: 'Test group',
    schedules: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCard],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('group', group);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
