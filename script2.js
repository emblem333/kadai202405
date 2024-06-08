const postMemo = () => {
  const cardContainer = document.getElementById('card-container');
  const memoTitle = document.getElementById('memo_title').value;
  const memoBody = document.getElementById('memo_body').value;
  const imageFile = document.getElementById('image_input').files[0];

  if (memoTitle.trim() !== '' && memoBody.trim() !== '') {
      const storeMemo = {
          title: memoTitle,
          body: memoBody,
          image: imageFile ? URL.createObjectURL(imageFile) : null,
          timestamp: new Date().getTime()
      };

      saveMemo(storeMemo);
      displayTimeline();
      document.getElementById('memo_title').value = '';
      document.getElementById('memo_body').value = '';
      document.getElementById('image_input').value = '';
  }
}

const saveMemo = store => {
  const memos = JSON.parse(localStorage.getItem('memos')) || [];
  memos.push(store);
  localStorage.setItem('memos', JSON.stringify(memos));
}

const displayTimeline = () => {
  const timelineDiv = document.getElementById('list-memos');
  const timelineMemos = JSON.parse(localStorage.getItem('memos')) || [];
  timelineDiv.innerHTML = '';

  timelineMemos.forEach( memo => {
      const memoCard = document.createElement('div');
      memoCard.className = 'card';
      memoCard.style.width = '13.5rem';

      const memoCardbody = document.createElement('div');
      memoCardbody.classList.add('card-body');

      const memoCardtitle = document.createElement('h5');
      memoCardtitle.className = 'card-title';
      memoCardtitle.textContent = memo.title;

      const memoCardtext = document.createElement('p');
      memoCardtext.className = 'card-text';
      memoCardtext.textContent = memo.body;
      
      const memoCardimg = document.createElement('img');
      memoCardimg.className = 'card-img-top';
      memoCardimg.alt = 'memo image';
      memoCardimg.src = memo.image || 'no_image.jpg'; // 画像がない場合のデフォルト画像

      memoCardbody.appendChild(memoCardtitle);
      memoCardbody.appendChild(memoCardtext);
      memoCard.appendChild(memoCardimg);
      memoCard.appendChild(memoCardbody);

      timelineDiv.appendChild(memoCard);
  });
}
displayTimeline();
