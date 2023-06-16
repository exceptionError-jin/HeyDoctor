package com.heydoctor.app.service.loginpage;

import com.heydoctor.app.dao.UserDAO;
import com.heydoctor.app.domain.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginPageServiceImpl implements LoginPageService {
    private final UserDAO userDAO;

    //    아이디 중복검사
    @Override
    public Optional<UserVO> checkEmail(String userEmail){
        return userDAO.findByUserEmail(userEmail);
    }

    //    회원가입
    @Override
    public void join(UserVO userVO){
        userDAO.save(userVO);
    }

    //    로그인
    @Override
    public Optional<Long> login(String userEmail, String userPassword){
        return userDAO.findByUserEmailAndUserPassword(userEmail, userPassword);
    }

    //    회원 조회
    @Override
    public Optional<UserVO> getUser(Long userId) {
        return userDAO.findById(userId);
    }

}
