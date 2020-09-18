import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const TextInput = ({ value }) => {
    return (
      <div>{value}</div>
    )
  };
  
  TextInput.propTypes = {
    value: PropTypes.string,
  };
  
  export const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };
function Signup() {
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();

    const onSubmit = useCallback((e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      return dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          id,
          password,
          nick,
        },
      });
    }, [password, passwordCheck]);

    // const onSubmit = useCallback((e) => {
    //   e.preventDefault();
    //   if (password !== passwordCheck) {
    //     return setPasswordError(true);
    //   }
    //   console.log("password")
    // }, [password, passwordCheck]);
  


    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

  
    return (
    <>
        <Form style={{ padding: 10 }}>
            <TextInput value="135135" />
            <div>
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input name="user-id" value={id} required onChange={onChangeId} />
            </div>
            <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input name="user-nick" value={nick} required onChange={onChangeNick} />
            </div>
            <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            <div>
            <label htmlFor="user-password-check">비밀번호체크</label>
            <br />
            <Input
                name="user-password-check"
                type="password"
                value={passwordCheck}
                required
                onChange={onChangePasswordCheck}
            />
            {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
            </div>
            
            <div style={{ marginTop: 10 }}>
            <Button type="primary" onClick={onSubmit}>가입하기</Button>
            </div>
        </Form>
    </>
    )
}

export default Signup