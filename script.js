const PostMemo = () => {
  const memoTitle = document.getElementById('memo_title').value;
  const memoBody = document.getElementById('memo_body').value;
  const imageFile = document.getElementById('image-input').files[0];
  if(memoBody.trim() !== '') {
    //空欄ではなかった場合、以下のオブジェクトに文章（画像）の情報を格納する
    const Post = {
      title: memoTitle,
      body: memoBody,
      image: imageFile ? URL.createObjectURL(imageFile) : null, //（三項）条件演算子
      timestamp: new Date().getTime()
    };
    //関数呼び出し
    saveMemo(Post)
    displayTimeline();
    document.getElementById('memo_title').value = '';
    document.getElementById('memo_body').value = '';
    document.getElementById('image_input').value = '';
  }
}