export interface comment {
  id: number,
  body: string,
  user_id: number,
  created_at: Date,
  updated_at: Date | null,
  user_name: string,
  user_email: string,
  user_username: string,
  user_photo: [string] | null,
  user_last_name: string,
  user_role: 1 | 2 | 3
}

export interface responseGetCommentOfNote {
  success: boolean,
  code: number,
  message: string,
  data: [comment]
}
export interface dataAddComment {
  nid: number,
  user_id: number,
  comment: string
}

export interface responseAddComment extends Omit<responseGetCommentOfNote, 'data'> {
  data: {
    id: number,
    note_id: number,
    comment_id: number,
  }
}

export interface dataUpdateComment {
  cid: number,
  comment: string
}

export interface responseUpdateComment extends Omit<responseGetCommentOfNote, 'data'> {
  data: comment
}

export interface responseDeleteComment extends Omit<responseGetCommentOfNote, 'data'> {
  data: {
    id: number,
    body: string,
    created_at: Date
    updated_at: Date | null
  }
}
