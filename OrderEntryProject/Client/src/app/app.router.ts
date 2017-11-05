/**
 * UIRouterConfigFn
 */
import {UIRouter} from "@uirouter/angular";

export function UIRouterConfigFn(router: UIRouter) {

  // If no URL matches, go to the `product` state's name by default
  router.urlService.rules.otherwise({state: 'product'});

}
