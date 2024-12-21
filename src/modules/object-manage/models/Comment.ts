import { Model } from '../core/Model';

export class Comment extends Model {
  msg: string;

  constructor(msg: string) {
    super();
    this.msg = msg;
  }
}
