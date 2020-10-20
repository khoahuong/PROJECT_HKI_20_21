package com.huongmk.probackend.config.oauth2;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
import com.huongmk.probackend.entrance.repositories.TableUsersRepository;
import com.huongmk.probackend.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author HuongMK
 */
@Service("userDetailsService")
public class UsersOauth2Service implements UserDetailsService {

    @Autowired
    private TableUsersRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TableUsersDomain usersDomain = userRepo.findByUserNameAndIsActive(username, Constants.STATUS.ACTIVE);
        if (usersDomain == null) {
            throw new UsernameNotFoundException("Tên đăng nhập hoặc mật khẩu không đúng"); // check tên đăng nhập
        }
        return UsersPrincipalOauth2.create(usersDomain);
    }
}
