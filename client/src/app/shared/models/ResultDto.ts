export type ResultDto<T> ={
  isSuccess: boolean;
  message:string;
  data: T;
}
