/**
 * AppStates
 */
import {ProductComponent} from './views/wizard/product/product.component';
import {BillingComponent} from './views/wizard/billing/billing.component';
import {WorkflowService} from './workflow/workflow.service';

/**
 * AppStates
 */
export const AppStates = [

  // 1st State
  {name: 'product', url: '/product', component: ProductComponent},

  // 2nd State
  {name: 'billing', url: '/billing', component: BillingComponent, onEnter: verifyWorkFlow},

];

/**
 * verifyWorkFlow
 *
 * @param transition
 * @param state
 * @returns {TargetState}
 */
export function verifyWorkFlow(transition, state) {
  let $stateService = transition.router.stateService;
  let workflowService = transition.injector().get(WorkflowService);

  // If any of the previous steps is invalid, go back to the first invalid step
  let firstState = workflowService.getFirstInvalidStep(state.name);
  if (firstState.length > 0) {
    return $stateService.target(firstState);
  }
}
