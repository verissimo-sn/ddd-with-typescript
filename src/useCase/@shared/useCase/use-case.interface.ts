export interface IUseCase<I extends Object | undefined, O = void> {
  execute(input: I): Promise<O>;
}
