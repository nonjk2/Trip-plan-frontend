type TUrlPath =
  | 'my-post/plans'
  | 'dibs/plans'
  | 'my-post/reviews'
  | 'dibs/reviews'
  | 'storage'
  | 'my-comments'
  | 'inquiry';

type TListItem = {
  title: string;
  urlPath: TUrlPath;
  order: number;
  subItems?: {
    title: string;
    urlPath: TUrlPath;
  }[];
};

export type TNAV_OPTIONS = {
  category: string;
  listItems: TListItem[];
};
