import { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as Auth from '../utils/Auth.js';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup';
import DeleteCardConfirmPopup from './DeleteCardConfirmPopup';
import Footer from './Footer';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import successSignImg from '../images/union.svg';
import unSuccessSignImg from '../images/union-wrong.svg';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardConfirmPopupOpen, setIsDeleteCardConfirmPopupOpen] =
    useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [removeCard, setRemoveCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [userData, setUserData] = useState({ _id: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false); //TODO объединить стейты по рекомендацции ревьюера
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState({ image: "", text: ""});
  
  const history = useHistory();

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getProfile()
        .then((userData) => {
          setCurrentUser({
            ...userData,
            userName: userData.name,
            userDescription: userData.about,
            userAvatar: userData.avatar,
          });
        })
        .catch((err) => console.log(`Ошибка...: ${err}`));

      api
        .getUsersCards()
        .then((cardList) => {
          const usersCard = cardList.map((card) => {
            return {
              name: card.name,
              link: card.link,
              likes: card.likes,
              cardId: card._id,
              ownerId: card.owner._id,
            };
          });
          setCards(usersCard);
        })
        .catch((err) => console.log(`Ошибка...: ${err}`));

      history.push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then((userData) => {
        setCurrentUser({
          ...userData,
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка...: ${err}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editProfileAvatar(avatar)
      .then((userData) => {
        setCurrentUser({
          ...userData,
          userAvatar: userData.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка...: ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([
          {
            name: newCard.name,
            link: newCard.link,
            likes: newCard.likes,
            cardId: newCard._id,
            ownerId: newCard.owner._id,
          },
          ...cards,
        ]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка...: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card.cardId)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => {
              if (item.cardId === card.cardId) {
                return {
                  name: newCard.name,
                  link: newCard.link,
                  likes: newCard.likes,
                  cardId: newCard._id,
                  ownerId: newCard.owner._id,
                };
              } else return item;
            })
          );
        })
        .catch((err) => console.log(`Ошибка...: ${err}`));
    } else {
      api
        .addLike(card.cardId)
        .then((newCard) => {
          setCards((stateCards) =>
            stateCards.map((item) => {
              if (item.cardId === card.cardId) {
                return {
                  name: newCard.name,
                  link: newCard.link,
                  likes: newCard.likes,
                  cardId: newCard._id,
                  ownerId: newCard.owner._id,
                };
              } else return item;
            })
          );
        })
        .catch((err) => console.log(`Ошибка...: ${err}`));
    }
  }

  function handleDeleteCard() {
    api
      .deleteCard(removeCard.cardId)
      .then(() => {
        setCards((stateCards) =>
          stateCards.filter((item) => item.cardId !== removeCard.cardId)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка...: ${err}`));
  }

  function handleRegister({ password, email }) {
    return Auth.register(password, email)
      .then((res) => {
        console.log("res", res);
        const { email } = res;
        setUserData({ ...userData, email });
        setIsInfoTooltipMessage({
          image: successSignImg,
          text: "Вы успешно зарегистрировались!",
        });
        history.push("/signin");
      })
      .catch((err) => {
        console.log(`Ошибка...: ${err}`);
        setIsInfoTooltipMessage({
          image: unSuccessSignImg,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogin({ password, email }) {
    return Auth.authorize(password, email)
      .then((data) => {
        if (data.email) {
          setLoggedIn(true);
          setUserData({ _id: data._id, email: data.email });
          localStorage.setItem("email", data.email );
          handleCheckToken();
          // localStorage.setItem("jwt", data.token);
          // handleCheckToken();
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(`Ошибка...: ${err}`);
        setIsInfoTooltipMessage({
          image: unSuccessSignImg,
          text: "Неверный email или пароль. Попробуйте ещё раз.",
        });
        setIsInfoToolTipOpen(true);
      });
  }

  function handleCheckToken() {
    if (localStorage.getItem("email")) {
    //   let token = localStorage.getItem("jwt");
      Auth.getContent()
        .then((res) => {
          const { _id, email } = res.data;
          setLoggedIn(true);
          setUserData({ _id, email });
          //history.push('/');
        })
        .catch((err) => {
          console.log(`Ошибка...: ${err}`);
        });
      }
  }

  function handleLogOut() {
    // localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    setLoggedIn(false);
    setUserData({ _id: "", email: "" });
    history.push("/signin");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleTrashbinClick(card) {
    setIsDeleteCardConfirmPopupOpen(true);
    setRemoveCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardConfirmPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          handleLogOut={handleLogOut}
          userData={userData}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleTrashbinClick}
            cards={cards}
          ></ProtectedRoute>

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />

        {/* Модалка редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        {/* Модалка смены аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        {/* Модалка добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>

        {/* Модалка удаления карточки */}
        <DeleteCardConfirmPopup
          isOpen={isDeleteCardConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmCardDelete={handleDeleteCard}
        ></DeleteCardConfirmPopup>

        {/* Модалка открытия картинки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* Модалка с ответом о регистрации */}
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          image={isInfoTooltipMessage.image}
          text={isInfoTooltipMessage.text}
        ></InfoToolTip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;