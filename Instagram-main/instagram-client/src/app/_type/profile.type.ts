export interface SuccessGetPostInProfile {
  data: {
    post_post_id: string;
    post_photo: string[];
    number_of_likes: string;
    number_of_comments: string;
  }[];
  message: string;
  hasMore: boolean
}

export interface SuccessGetProfile {
  data: {
    userProfile: {
      username: string;
      bio: string;
      avatar: string;
    };
    numberOfFollowers: string;
    numberOfFollowings: string;
    numberOfPost: string;
    message: string;
  };
}
