package com.example.demo.DRUser;

import com.example.demo.Answers.Answers;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

@Entity
@Table(name = "DR_User")
public class DRUser implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "vet_type")
    private String vetType;

    @Column(name = "size")
    private String size;

    @Column(name = "type")
    private String type;

    @Column(name = "country")
    private String country;

    @Column(name = "job")
    private String job;

    @Column(name = "work_exp")
    private String workExp;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age")
    private String age;

    @Transient
    Collection<? extends GrantedAuthority> authorities;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Answers> answers;

    public DRUser() {
        super();
    }

    public DRUser(String email, String password) {
        super();
        this.email = email;
        this.password = password;
    }

    public DRUser(String vetType, String size, String type, String country,
                  String job, String workExp, String gender, String age) {
        super();
        this.vetType = vetType;
        this.size = size;
        this.type = type;
        this.country = country;
        this.job = job;
        this.workExp = workExp;
        this.gender = gender;
        this.age = age;
    }

    @Override
    public String toString() {
        return "DRUser [id=" + id + ", email=" + email + ", password=" + password + ", vetType=" + vetType + ", size="
                + size + ", type=" + type + ", country=" + country + ", job=" + job + ", workExp=" + workExp
                + ", gender=" + gender + ", age=" + age + "]";
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public String getVetType() {
        return vetType;
    }

    public void setVetType(String vetType) {
        this.vetType = vetType;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getWorkExp() {
        return workExp;
    }

    public void setWorkExp(String workExp) {
        this.workExp = workExp;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }


    public boolean isRegistered(){
        return !(workExp == null);
    }
    /*
   INTERFACE METHODS
    */
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        GrantedAuthority grantedAuthority = new GrantedAuthority() {
            //anonymous inner type
            public String getAuthority() {
                return "ROLE_USER";
            }
        };
        grantedAuthorities.add(grantedAuthority);
        return grantedAuthorities;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
