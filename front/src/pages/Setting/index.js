import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST, LOG_OUT_INIT } from '../../reducers/user';
import TermsDialog from '../../components/TermsDialog';

//환경설정 페이지
const Setting = ({ history }) => {
  const dispatch = useDispatch();
  const { logOutDone, userinfoError } = useSelector((state) => state.userReducer);
  const logout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  });
  useEffect(() => {
    if (logOutDone) {
      history.push('/');
      dispatch({ type: LOG_OUT_INIT });
    }
  }, [logOutDone]);

  const [showTerms, setShowTerms] = useState(false);
  const onOpenTerms = useCallback(() => {
    setShowTerms(true);
  }, []);
  const onCloseTerms = useCallback(() => {
    setShowTerms(false);
  }, []);

  let isLogin = true;
  if (!window.localStorage.getItem('user') || userinfoError) {
    isLogin = false;
  }

  return (
    <>
      <Header />

      <div className="setting">
        <ul>
          {isLogin && (
            <li>
              <Link to="/setprofile">
                프로필 수정하기 <RightOutlined />
              </Link>
            </li>
          )}
          <li onClick={setShowTerms}>
            이용약관 <RightOutlined />
          </li>
          <li>
            <Link to="/complaint">
              불편신고 <RightOutlined />
            </Link>
          </li>
          {isLogin && (
            <li onClick={logout}>
              로그아웃 <RightOutlined />
            </li>
          )}
          {/* <li>
            <Link to="/">
              앱 업데이트 정보 <RightOutlined />
            </Link>
          </li> */}
          <li>
            <Link to="/alarm">
              애플리케이션 알림 <RightOutlined />
            </Link>
          </li>
          <li>
            <Link to="/memberOut">
              회원탈퇴 <RightOutlined />
            </Link>
          </li>
        </ul>
      </div>
      <BottomNav />
      {showTerms && <TermsDialog onCloseTerms={onCloseTerms} />}
    </>
  );
};

export default Setting;
