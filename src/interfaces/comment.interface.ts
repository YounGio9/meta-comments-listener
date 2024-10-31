export interface Comment {
  entry: Entry[];
  object: string;
}

export interface Entry {
  id: string;
  time: number;
  changes: Change[];
}

export interface Change {
  value: CommentValue | MediaValue;
  field: string;
}

export interface CommentValue {
  from: CommentFrom;
  media: CommentMedia;
  id: string;
  parent_id?: string;
  text: string;
  parent?: CommentValue;
}

export interface MediaValue {
  media_id: string;
  comment_id: string;
}

export interface CommentFrom {
  id: string;
  username: string;
}

export interface CommentMedia {
  id: string;
  media_product_type: string;
}
