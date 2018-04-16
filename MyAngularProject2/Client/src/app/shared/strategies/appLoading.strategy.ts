import { Route, PreloadingStrategy } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export class AppPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    const loadRoute = delay =>
      delay ? timer(150).pipe(mergeMap(_ => load())) : load();
    return route.data && route.data.preload
      ? loadRoute(route.data.delay)
      : of(null);
  }
}
