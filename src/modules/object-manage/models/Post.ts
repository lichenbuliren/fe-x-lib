import { Model } from '../core/Model';

export class Post extends Model {
  id: number;

  title: string;

  content?: string;

  constructor(data: { id: number; title: string; content?: string }) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
  }
}
