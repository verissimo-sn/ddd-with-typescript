export interface IUseCase<
  I extends Object | undefined = undefined,
  O extends Object | void = void
> {
  execute(input: I): Promise<O>;
}
