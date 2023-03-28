import { useState } from "react";
import "./App.scss";
import "boxicons";

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Новые",
      items: [
        {
          id: 1,
          job: "UI/UX дизайнер",
          name: "Алексей Щербаков",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 2,
          job: "Маркетолог",
          name: "Floyd Miles",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 3,
          job: "Менеджер по продажам",
          name: "Theresa Webb",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 4,
          job: "UI/UX дизайнер",
          name: "Vanessa Johnson",
          color: "purple",
          type: "В приоритете",
        },
      ],
    },
    {
      id: 2,
      title: "Текущие",
      items: [
        {
          id: 5,
          job: "PHP Developer",
          name: "Kristin Watson",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 6,
          job: "Freshers",
          name: "Jacob Jones",
          color: "blue",
          type: "Второстепенная",
        },
        {
          id: 7,
          job: "UI/UX дизайнер",
          name: "Wade Warren",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 8,
          job: "Joomla Developer",
          name: "Cameron Williamson",
          color: "blue",
          type: "Второстепенная",
        },
        {
          id: 9,
          job: "Python Developer",
          name: "Devon Lane",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 10,
          job: "Freshers",
          name: "Jacob Jones",
          color: "blue",
          type: "Второстепенная",
        },
      ],
    },
    { id: 3, title: "Закрытые", items: [] },
    {
      id: 4,
      title: "Архив",
      items: [
        {
          id: 11,
          job: "UX Architect",
          name: "Guy Hawkins",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 12,
          job: "Human Resource",
          name: "Annette Black",
          color: "red",
          type: "Срочная заявка",
        },
        {
          id: 13,
          job: "Python Developer",
          name: "Esther Howard",
          color: "red",
          type: "Срочная заявка",
        },
      ],
    },
    {
      id: 5,
      title: "Удаленные",
      items: [
        {
          id: 14,
          job: "UI/UX дизайнер",
          name: "Алексей Щербаков",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 15,
          job: "Маркетолог",
          name: "Jacob Jones",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 16,
          job: "Маркетолог",
          name: "Wade Warren",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 17,
          job: "Joomla Developer",
          name: "Cameron Williamson",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 18,
          job: "Python Developer",
          name: "Devon Lane",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 19,
          job: "Freshers",
          name: "Jacob Jones",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 20,
          job: "Freshers",
          name: "Jacob Jones",
          color: "purple",
          type: "В приоритете",
        },
        {
          id: 21,
          job: "Freshers",
          name: "Jacob Jones",
          color: "purple",
          type: "В приоритете",
        },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className == "card") {
      e.target.style.transform = 'translateY(-5px)'
      e.target.style.transition = 'transform 0.4s ease'
      
    }
  };
  
  
  const dragLeaveHandler = (e) => {
    e.target.style.transform = 'translateY(5px)'
  };
  
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };
  const dragEndHandler = (e) => {
    e.target.style.transform = 'translateY(5px)'
  };
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  const dropCardHandler = (e, board) => {
    const currentIndex = currentBoard.items.indexOf(currentItem);
    if (board.items.length === 0) {
      board.items.push(currentItem);
      currentBoard.items.splice(currentIndex, 1);
    }
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  };

  window.onscroll = () => {
    let scrollTop = window.scrollY;
    let title = document.getElementsByClassName('board_title');
    for (let i = 0; i < title.length; i++) {
      let el = title[i];
      if(scrollTop >= 90) {
        el.style.position = 'fixed';
        el.style.transform = 'translateY(-90px)';
      } else {
        el.style.position = 'absolute'
        el.style.transform = 'translateY(-5px)';
      }
      
    }


  }

  return (
    <div className="App">
      <header></header>
      <div className="main">
        <div className="left"></div>
        <div className="right">
          <h2>
            Заявки
            <span>
              {" "}
              •{" "}
              {boards[0].items.length +
                boards[1].items.length +
                boards[2].items.length +
                boards[3].items.length +
                boards[4].items.length}
            </span>
          </h2>
          <div className="boards">
            {boards.map((board) =>
              board.items.length !== 0 ? (
                <div
                  key={board.id}
                  onDrop={(e) => dropCardHandler(e, board)}
                  onDragOver={(e) => dragOverHandler(e)}
                  className="board"
                >
                  <div className="board_title">
                    {board.title} • {board.items.length}
                  </div>

                  <div className="card_container">
                  {board.items.map((item) => (
                      <div
                        key={item.id}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragStart={(e) => dragStartHandler(e, board, item)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDrop={(e) => dropHandler(e, board, item)}
                        draggable={true}
                        className="card"
                      >
                        <div className="up">
                          <h3>{item.job}</h3>
                          <box-icon name="dots-vertical-rounded"></box-icon>
                        </div>
                        <div className="mid">
                          <div className={`mida ${item.color}`}>
                            {item.type}
                          </div>
                          <div className="midb">
                            <box-icon name="user"></box-icon>3
                          </div>
                          <div className="midc">
                            <box-icon name="file-blank"></box-icon>
                            182
                          </div>
                        </div>
                        <div className="down">
                          <img src="../images/image.png" alt="" />
                          <div className="name">
                            <p>Рекруитер</p>
                            <h4>{item.name}</h4>
                          </div>
                        </div>
                      </div>
                  ))}
                    </div>
                </div>
              ) : (
                <div
                  className="empty board"
                  key={board.id}
                  onDrop={(e) => dropCardHandler(e, board)}
                  onDragOver={(e) => dragOverHandler(e)}
                >
                  <div className="board_title">
                    {board.title} • {board.items.length}
                  </div>
                  <img src="../images/addfiles.png" alt="" />
                  <p>Если есть подходящие заявки, перетащите их сюда 🤓</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
