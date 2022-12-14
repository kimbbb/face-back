import connection from "../db";

export const createBoard = async (req, res) => {
  const { title, content, weather, face } = req.body;
  console.log(weather);
  const today = new Date();
  try {
    await connection.query(
      `INSERT INTO board(title, content, save_date, weather, face)
            VALUES("${title}", "${content}", "${today.toLocaleDateString()}", "${weather}", "${face}")`,
      (err, result) => {
        if(err) console.log(err);
        return res.status(200).json({
          status: 200,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "서버 오류입니다",
    });
  }
};


export const getBoard = async (req, res) => {
  try {
    await connection.query(
      `SELECT * FROM board`,
      (err, result) => {
        let data = [];
        for(let i=0; i<result.length; i++){
          data.push(result[i])
        }

        return res.status(200).json({
          status: 200,
          data: data
        });
      }
    );
    
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "서버 오류입니다",
    });
  }
};

export const getBoardList = async (req, res) => {
  try {
    await connection.query(`SELECT * FROM board`, (err, result) => {
      let boardArray = [];
      result.forEach((board, index) => {
        boardArray.push({
          id: result[index].id,
          title: result[index].title,
          content: result[index].content,
          saveDate: result[index].save_date,
          weather: result[index].weather,
          face: result[index].face,
        });
        index++;
      });

      return res.status(200).json({
        status: 200,
        boardArray,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "서버 오류입니다",
    });
  }
};

export const deleteBoard = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  try {
    await connection.query(
      `delete from board where id=${id};`,
      (err, result) => {
        return res.status(204).json({
          status: 204,
          message: "삭제되었습니다",
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "서버 오류입니다",
    });
  }
};
