const postTweet = () => {
  const tweetContent = document.getElementById('tweet-input').value;
  const imageFile = document.getElementById('image-input').files[0];
  if(tweetContent.trim() !== '') {
    //空欄ではなかった場合、以下のオブジェクトに文章（画像）の譲歩を格納する
    const tweet = {
      content: tweetContent,
      //（三項）条件演算子
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      timestamp: new Date().getTime()
    };
    //関数呼び出し
    saveTweet(tweet)
    displayTimeline();
    document.getElementById('tweet-input').value = ''; //入力後テキストをクリアする
    document.getElementById('image-input').value = '';//入力後テキストをクリアする
  }
}

//投稿する内容をローカルストレージに格納する関数
const saveTweet = (tweet) => {
  const tweets = JSON.parse(localStorage.getItem('tweets')) || []; //JSON形式からオブジェクトに変換
  tweets.push(tweet);// ローカルストレージから出した（変化した）オブジェクトに新しく入力されたデータを追加
  localStorage.setItem('tweets',JSON.stringify(tweets)) // オブジェクトからJSON形式に変換してローカルストレージに格納
}

//タイムラインを表示させる関数
const displayTimeline = () => {
  const timelineDiv = document.getElementById('timeline');
  timelineDiv.innerHTML = ''; //以前の投稿文を消去
  const tweets = JSON.parse(localStorage.getItem('tweets')) || []; //JSON形式からオブジェクトに変換
  //tweetオブジェクトに対して、以下の関数の処理を１つずつ実行する
  tweets.forEach((tweet) => {
    const tweetElement = document.createElement('article');
    tweetElement.classList.add('tweet');
    tweetElement.innerHTML = '<p>' + tweet.content + '</p>'
    if(tweet.image) {
      tweetElement.innerHTML += '<img src=' + tweet.image + ' alt="tweet iamge">';
    }
    tweetElement.innerHTML += '<span class="tweet-date">' + new Date(tweet.timestamp).toLocaleString() + '</span>';
    timelineDiv.appendChild(tweetElement);
  });
}
//ページを離れて戻ってきた際にもタイムラインが表示される
displayTimeline();