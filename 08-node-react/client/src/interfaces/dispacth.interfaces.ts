export interface Dispatch<S> {
  <A extends Action>(action: A): A;
}
export interface Action {
  type: any;
}