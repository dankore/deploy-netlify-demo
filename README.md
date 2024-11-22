## **Hanyoyin Deployment**

### 1. **Loda Kai Tsaye (Direct Upload)**
- Yi **sign up** ko shiga [Netlify](https://www.netlify.com/).
- Shirya project ɗinka: tabbatar dukkan HTML, CSS, da JavaScript sun kasance a cikin wata **directory guda**.
- Ja ka sauke (**drag and drop**) wannan directory a kan **Netlify Dashboard** domin ayi deploy nan take.

---

### 2. **Deploy ta GitHub**
#### 1. **Ƙirƙiri GitHub Repository**
- Je zuwa [GitHub](https://github.com/) kuma ƙirƙiri sabuwar repo don project ɗinka.

#### 2. **Loda Code zuwa GitHub**
- Yi **download** na Git daga [Git SCM](https://git-scm.com/).
- Yi initialize na git a cikin directory ɗinka:
  ```bash
  git init
  ```
- Add da commit na files ɗinka:
  ```bash
  git add .
  git commit -m "first commit"
  ```
- Ƙirƙiri reshe (branch) na `master` ko `main`:
  ```bash
  git branch -M master
  ```
- Add na remote repository ɗinka:
  ```bash
  git remote add origin https://github.com/dankore/deploy-netlify-demo.git
  ```
- Tura (push) code zuwa GitHub:
  ```bash
  git push -u origin master
  ```

#### 3. **Haɗa GitHub da Netlify**
- Shiga cikin asusun Netlify ɗinka.
- Zaɓi **New Site from Git**.
- Bada izini ga Netlify don samun damar GitHub account ɗinka.
- Nemo repo ɗinka kuma zaɓe shi.
- Danna **Deploy Site** domin fara deploy.
