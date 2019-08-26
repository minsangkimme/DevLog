const Hotel = {
  // 고객 리스트
  _name: [],

  // 체크인
  checkIn: function(name) {
    if (this._name.indexOf(name) > -1) return `${name}님은 이미 체크인 상태입니다.`;

    const valueCheck = typeof name === 'string' && name.length > 0 ? this._name.push(name) : false;

    if (!valueCheck) return 'ERROR: Type Or Length Error';

    return `안녕하세요. ${this._name[valueCheck - 1]}님 반갑습니다`;
  },

  // 체크아웃
  checkOut: function(name) {
    if (this._name.indexOf(name) === -1) return '없는 고객입니다.';

    let guest = []; // this._name 복제용도
    const valueCheck = typeof name === 'string' && name.length > 0 ? this._name.indexOf(name) : false;

    guest = this._name.slice();
    this._name.splice(valueCheck, 1);

    if (valueCheck > -1) return `${guest[valueCheck]}님 감사합니다. 안녕히 가세요`;
    if (!valueCheck) return 'ERROR: Type Or Length Error';
  },

  // 고객 상태체크
  getStatus: function() {
    const status = this._name.length > 0 ? `${this._name}님이 체크인했습니다.` : '고객이 없습니다';
    return status;
  },
};

// 체크인 및 상태 확인
console.log('---체크인 및 상태 확인---');
console.log(Hotel.checkIn('크롱'));
console.log(Hotel.checkIn('포비'));
console.log(Hotel.checkIn('뽀로로'));
console.log(Hotel.checkIn('도라에몽'));
console.log(Hotel.getStatus());
console.log('------------------------');

// 고객리스트 체크
console.log('---고객 리스트 체크---');
console.log(Hotel.checkIn('크롱'));
console.log(Hotel.checkOut('민상'));
console.log('---------------------');

// 체크아웃 및 상태 확인
console.log('---체크아웃 및 상태 확인---');
console.log(Hotel.checkOut('포비'));
console.log(Hotel.getStatus());
console.log(Hotel.checkOut('뽀로로'));
console.log(Hotel.getStatus());
console.log('-------------------------');
