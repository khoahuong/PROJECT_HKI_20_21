package com.huongmk.probackend.entrance.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_USERS", schema = "ENTRANCE_REGIS")
public class TableUsersDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_USERS_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_USERS_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_USERS_SEQ")
    @Column(name = "ID")
    private Long id;
    @Size(max = 50)
    @Column(name = "USER_NAME")
    private String userName;
    //    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(max = 512)
    @Column(name = "PASS_WORD")
    private String passWord;
    @Column(name = "IS_ROLE")
    private Long isRole;
    @Size(max = 50)
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Size(max = 50)
    @Column(name = "LAST_NAME")
    private String lastName;
    @Size(max = 255)
    @Column(name = "POSITION")
    private String position;
    @Column(name = "BIRTHDAY")
    @Temporal(TemporalType.DATE)
    private Date birthday;
    @Size(max = 512)
    @Column(name = "ADDRESS")
    private String address;
    @Size(max = 15)
    @Column(name = "PHONE")
    private String phone;
    @Size(max = 50)
    @Column(name = "EMAIL")
    private String email;
    @Size(max = 255)
    @Column(name = "AVATAR_GUIID")
    private String avatarGuiid;
    @Size(max = 255)
    @Column(name = "AVATAR_LINK")
    private String avatarLink;
    @Size(max = 255)
    @Column(name = "AVATAR_NAME")
    private String avatarName;
    @Column(name = "AVATAR_SIZE")
    private BigDecimal avatarSize;
    @Column(name = "LAST_LOGIN")
    @Temporal(TemporalType.DATE)
    private Date lastLogin;
    @Column(name = "IS_ACTIVE")
    private Long isActive;
    @Column(name = "DATE_CREATED")
    @Temporal(TemporalType.DATE)
    private Date dateCreated;
    @Column(name = "DATE_UPDATED")
    @Temporal(TemporalType.DATE)
    private Date dateUpdated;
    @Size(max = 50)
    @Column(name = "SO_CMND")
    private String soCmnd;
    @Size(max = 50)
    @Column(name = "CODE_RESET_PASS")
    private String codeResetPass;
    @Column(name = "TIME_SET_CODE")
    @Temporal(TemporalType.DATE)
    private Date timeSetCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public Long getIsRole() {
        return isRole;
    }

    public void setIsRole(Long isRole) {
        this.isRole = isRole;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarGuiid() {
        return avatarGuiid;
    }

    public void setAvatarGuiid(String avatarGuiid) {
        this.avatarGuiid = avatarGuiid;
    }

    public String getAvatarLink() {
        return avatarLink;
    }

    public void setAvatarLink(String avatarLink) {
        this.avatarLink = avatarLink;
    }

    public String getAvatarName() {
        return avatarName;
    }

    public void setAvatarName(String avatarName) {
        this.avatarName = avatarName;
    }

    public BigDecimal getAvatarSize() {
        return avatarSize;
    }

    public void setAvatarSize(BigDecimal avatarSize) {
        this.avatarSize = avatarSize;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Long getIsActive() {
        return isActive;
    }

    public void setIsActive(Long isActive) {
        this.isActive = isActive;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public String getSoCmnd() {
        return soCmnd;
    }

    public void setSoCmnd(String soCmnd) {
        this.soCmnd = soCmnd;
    }

    public String getCodeResetPass() {
        return codeResetPass;
    }

    public void setCodeResetPass(String codeResetPass) {
        this.codeResetPass = codeResetPass;
    }

    public Date getTimeSetCode() {
        return timeSetCode;
    }

    public void setTimeSetCode(Date timeSetCode) {
        this.timeSetCode = timeSetCode;
    }
}
