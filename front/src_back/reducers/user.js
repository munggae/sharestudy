import produce from '../utils/produce';

export const initialState = {
    logInDone: false, // 로그인 여부
    logInLoading: false, // 로그인 시도중
    logInError: '', // 로그인 실패 사유
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,//로그아웃완료
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,//회원가입 성공
    signUpError: null,
    me: null, // 로그인 토큰 정보
    userInfo: [], // 나의 정보
    otheruserInfo:[],//다른사람 정보
    followerList:[],//팔로워리스트
    followingList:[],//팔로잉리스트
    profileimagePaths: 'undefiend',
    userinfoLoading:false, //내정보로딩
    userinfoDone:false,//내정보로딩완료
    userinfoError:null,
    followLoading:false, //팔로우시도중
    followInError:'',//팔로우실패이유
    followDone:false,//팔로우완료
    unfollowLoading:false, //언팔로우시도중
    unfollowInError:'',//언팔로우실패이유
    unfollowDone:false,//언팔로우완료
    followInfo:[],//팔로우당하는사람정보
    followerLoading:false,//팔로워리스트로딩
    followerDone:false,//팔로워리스트완료
    followerInError:'',//팔로워리스트에러
    followingLoading:false,//팔로잉리스트로딩
    followingDone:false,//팔로잉리스트완료
    followingInError:'',//팔로잉리스트에러
    uploadProfileImagesLoading: false,
    uploadProfileImagesDone: false,
    uploadProfileImagesError: null,
  };
export const USER_RESET="USER_RESET";

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';

export const UPLOAD_PROFILE_IMAGES_REQUEST = 'UPLOAD_PROFILE_IMAGES_REQUEST';
export const UPLOAD_PROFILE_IMAGES_SUCCESS = 'UPLOAD_PROFILE_IMAGES_SUCCESS';
export const UPLOAD_PROFILE_IMAGES_FAILURE = 'UPLOAD_PROFILE_IMAGES_FAILURE';
//팔로우
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
//팔로우캔슬
export const FOLLOW_CANCLE_REQUEST = 'FOLLOW_CANCLE_REQUEST';
export const FOLLOW_CANCLE_SUCCESS = 'FOLLOW_CANCLE_SUCCESS';
export const FOLLOW_CANCLE_FAILURE = 'FOLLOW_CANCLE_FAILURE';
//팔로워 리스트
export const FOLLOWER_LIST_REQUEST = 'FOLLOWER_LIST_REQUEST';
export const FOLLOWER_LIST_SUCCESS = 'FOLLOWER_LIST_SUCCESS';
export const FOLLOWER_LIST_FAILURE = 'FOLLOWER_LIST_FAILURE';
//팔로잉 리스트
export const FOLLOWING_LIST_REQUEST = 'FOLLOWING_LIST_REQUEST';
export const FOLLOWING_LIST_SUCCESS = 'FOLLOWING_LIST_SUCCESS';
export const FOLLOWING_LIST_FAILURE = 'FOLLOWING_LIST_FAILURE';
//다른사람 유저정보
export const OTHER_USER_INFO_REQUEST = 'OTHER_USER_INFO_REQUEST';
export const OTHER_USER_INFO_SUCCESS = 'OTHER_USER_INFO_SUCCESS';
export const OTHER_USER_INFO_FAILURE = 'OTHER_USER_INFO_FAILURE';
//내 정보 업데이트
export const USERINFO_UPDATE_REQUEST = 'USERINFO_UPDATE_REQUEST';
export const USERINFO_UPDATE_SUCCESS = 'USERINFO_UPDATE_SUCCESS';
export const USERINFO_UPDATE_FAILURE = 'USERINFO_UPDATE_FAILURE';

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});
export const logoutRequestAction = (data) => ({
  type: LOG_OUT_REQUEST,
  data
});
const userReducer = (state = initialState, action) => produce(state, (draft) => {
  
  switch (action.type) {
    case USER_RESET:
      draft.signUpDone = false;
      break;
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.me = action.data.jwt;
      draft.userInfo = action.data2;
      draft.logInDone = true;
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error.response.data;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutError = null;
      draft.logOutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.logInDone = false;
      draft.me = null;
      draft.userInfo = [];
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case USER_INFO_REQUEST:
      draft.userinfoLoading=true;
      draft.userinfoDone=false;
      break;
    case USER_INFO_SUCCESS:
      draft.userinfoDone=true;
      draft.userinfoLoading=false;
      draft.userInfo = action.data;
      break;
    case USER_INFO_FAILURE:
      draft.userinfoDone=true;
      draft.userinfoLoading=false;
      draft.userinfoError = action.error.response.data;
      break;
    case UPLOAD_PROFILE_IMAGES_REQUEST:
      draft.uploadProfileImagesLoading = true;
      draft.uploadProfileImagesDone = false;
      draft.uploadProfileImagesError = null;
      break;
    case UPLOAD_PROFILE_IMAGES_SUCCESS: {
      draft.userInfo.profileImage = action.data;
      draft.uploadProfileImagesLoading = false;
      draft.uploadProfileImagesDone = true;
      break;
    }
    case UPLOAD_PROFILE_IMAGES_FAILURE:
      draft.uploadProfileImagesLoading = false;
      draft.uploadProfileImagesError = action.error;
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.followDone = true;
      //draft.otheruserInfo.followInfo = draft.followInfo.concat(action.data.userkey);
      //draft.userInfo.followlist = draft.userInfo.followlist.filter(f=>f.fromUser.id !== action.data.userkey)
      console.log("action.data.userkey"+action.data.userkey)
      draft.userInfo.followlist.push({fromUser:{id:action.data.userkey}})

      //draft.me.Followings.push({ id: action.data.UserId });
      draft.userInfo.followlistsize = draft.userInfo.followlistsize+1;
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followInError = action.error;
      break;
    case FOLLOW_CANCLE_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowDone = false;
      break;
    case FOLLOW_CANCLE_SUCCESS:
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      //draft.followInfo.splice(0,draft.followInfo.length)
      //draft.followInfo = draft.followInfo.concat(action.data);
      //console.log(action.data)
      //console.log(state.userInfo.followlist)
      //console.log(state.userInfo.followlist.map(v=>v).filter(f=>f.toUser.id ,action.data.userKey))
      console.log(action.data)
      draft.userInfo.followlist = draft.userInfo.followlist.filter(f=>f.fromUser.id !== action.data.userkey)
      draft.userInfo.followlistsize = draft.userInfo.followlistsize-1;
      break;
    case FOLLOW_CANCLE_FAILURE: 
      draft.unfollowLoading = false;
      draft.unfollowInError = action.error;
      break;
    case FOLLOWER_LIST_REQUEST:
      draft.followerDone = false;
      draft.followerLoading = true;
      break;
    case FOLLOWER_LIST_SUCCESS:
      draft.followerLoading = false;
      draft.followerDone = true;
      draft.followerList = action.data;
      // draft.followInfo = action.data.map((item)=>item.fromUser);
      break;
    case FOLLOWER_LIST_FAILURE:
      draft.followerInError = action.error;
      draft.followerLoading = false;
      draft.followerDone = true;
      break;
    case FOLLOWING_LIST_REQUEST:
      draft.followingLoading = true;
      draft.followingDone = false;
      break;
    case FOLLOWING_LIST_SUCCESS:
      draft.followingLoading = false;
      draft.followingDone = true;
      draft.followingList = action.data;
      // draft.followInfo = action.data.map((item)=>item.toUser);
      break;
    case FOLLOWING_LIST_FAILURE:
      draft.followingLoading = false;
      draft.followingDone = true;
      draft.followingInError = action.error;
      break;
    case OTHER_USER_INFO_REQUEST:
      draft.userinfoLoading=true;
      draft.userinfoDone=false;
      break;
    case OTHER_USER_INFO_SUCCESS:
      draft.userinfoDone=true;
      draft.userinfoLoading=false;
      draft.otheruserInfo=action.data;
      break;
    case OTHER_USER_INFO_FAILURE:
      draft.userinfoDone=true;
      draft.userinfoLoading=false;
      draft.userinfoError = action.error.response.data;
      break;
    case USERINFO_UPDATE_REQUEST:
      break;
    case USERINFO_UPDATE_SUCCESS:
      break;
    case USERINFO_UPDATE_FAILURE:
      break;
    default:
      break;
    }
  });
  export default userReducer;
