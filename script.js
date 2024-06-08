const postMemo = () => {

  const memoTitle = document.getElementById('memo_title').value;
  const memoBody = document.getElementById('memo_body').value;
  const imageFile = document.getElementById('image_input').files[0];

  if(memoTitle.trim() !== '' && memoBody.trim() !== '') {
    //空欄ではなかった場合、以下のオブジェクトに文章（画像）の情報を格納する
    const  storeMemo = {
      title: memoTitle,
      body: memoBody,
      image: imageFile ? URL.createObjectURL(imageFile) : null, //（三項）条件演算子
      timestamp: new Date().getTime()
    };
    //関数呼び出し
    saveMemo(storeMemo)
    displayTimeline();
    document.getElementById('memo_title').value = ''; //空にする処理
    document.getElementById('memo_body').value = ''; //空にする処理
    document.getElementById('image_input').value = ''; //空にする処理
  }
}

//投稿する内容をローカルストレージに格納
const saveMemo = store => {
  const Memos = JSON.parse(localStorage.getItem('memos')) || [];
  Memos.push(store);
  localStorage.setItem('memos',JSON.stringify(Memos))
}

//タイムライン
const displayTimeline = () => {
  const timelineDiv = document.getElementById('list-memos');
  const cardContainer = document.getElementById('card-container');

  timelineDiv.innerHTML = '';
  const timelineMemos = JSON.parse(localStorage.getItem('memos')) || [];
    timelineMemos.forEach( (memo) => {
      const memoCard = document.createElement('div');
      memoCard.className = 'card';
      memoCard.style.width = '18rem';

      const memoCardbody = document.createElement('div');
      memoCardbody.classList.add('card-body');

      const memoCardtitle = document.createElement('h5');
      memoCardtitle.className = 'card-title';
      memoCardtitle.textContent = memo.title;
      //memoEloment.innerHTML = '<h2>' + memo.title + '<h2>' 
 
      const memoCardtext = document.createElement('p');
      memoCardtext.className = 'card-text';
      memoCardtext.textContent = memo.text;
      
      if(memo.image) {
        const memoCardimg = document.createElement('img');
        memoCardimg.className = 'card-img-top';
        memoCardimg.alt = 'memo iamge';
        memoCardimg.src = memo.image;
        memoCard.appendChild(memoCardimg);
      }else if(memo.image = null){
        const memoCardimg = document.createElement('img');
        memoCardimg.className = 'card-img-top';
        memoCardimg.alt = 'memo iamge';
        memoCardimg.src = no_image.jpg;
        memoCard.appendChild(memoCardimg);
      }
      //memoElement.innerHTML += '<img src=' + memo.image + ' alt="memo iamge">';
        
        memoCardbody.appendChild(memoCardtitle);
        memoCardbody.appendChild(memoCardtext);
        memoCard.appendChild(memoCardbody);

        cardContainer.appendChild(timelineDiv);
    });
        }
displayTimeline();