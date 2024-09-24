import { trigger, transition, style, query, animate, group, keyframes } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition(':increment', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden' // Ensures no content overflows during the animation
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '100%' })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('150ms ease-out', keyframes([
          style({ left: '0%', offset: 0 }),
          style({ left: '-100%', offset: 1 })
        ]))
      ], { optional: true }),
      query(':enter', [
        animate('150ms ease-out', keyframes([
          style({ left: '100%', offset: 0 }),
          style({ left: '0%', offset: 1 })
        ]))
      ], { optional: true })
    ])
  ]),
  transition(':decrement', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%' })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('150ms ease-out', keyframes([
          style({ left: '0%', offset: 0 }),
          style({ left: '100%', offset: 1 })
        ]))
      ], { optional: true }),
      query(':enter', [
        animate('150ms ease-out', keyframes([
          style({ left: '-100%', offset: 0 }),
          style({ left: '0%', offset: 1 })
        ]))
      ], { optional: true })
    ])
  ])
]);

