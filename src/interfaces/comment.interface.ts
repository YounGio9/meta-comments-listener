export interface Comment {
  id: string;
  time: number;
  changes: CommentChange[];
  object: string;
}

export interface CommentChange {
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
