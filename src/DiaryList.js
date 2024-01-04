import DiaryItem from "./DiaryItem";

// key로 인덱스도 사용 가능하지만 나중에 오류 발생 가능! -> unique한 키 이용
const DiaryList = ({ onEdit, onRemove, diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

// 오류가 날 경우 대비 - "0개의 일기가 있습니다."
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
