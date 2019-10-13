// 주석이 많은 코드는 좋은 코드가 아님 -> 불필요한 주석 달지 않는다
// -> 이름을 잘 짓고, 구조를 잘 짜서 코드만 보고도 이해하기 쉬운 게 좋음

document.addEventListener('DOMContentLoaded', function() {
    // init을 API로 오픈 -> 원하는 시점에 이닛 (ex. 동적으로 그린 UI 로드 후에 init)
    todos.init(); // todos라는 객체의 외부 통신 API인 init 메소드를 호출 -> 추상화
});

// 모듈화 -> 전역을 침범하지 않음 -> 꼭 필요한 메소드만 외부로 오픈 -> 변수는 속성, 함수는 메소드가 됨
// todos -> 싱글턴 객체 -> 아직 재사용은 하지않음 -> 기본적으로 private -> 캡슐화 + 클로저
const todos = (function() {
    const CACHE_KEY = 'TIL::todos::index'; // 키는 충돌하지 않도록 네임스페이스 등 포함하여 작성

    // DOM 캐싱은 모듈 전역에서 재사용이 빈번한 것만 한다 -> 모듈 로드이후 클로저로 계속 묶여있다
    const mainEl = document.querySelector('.main');
    const footerEl = document.querySelector('.footer');
    const toDoCountEl = document.querySelector('.todo-count strong');
    const activeUlEl = document.querySelector('.todo-list');

    // 호이스팅으로 성능저하, 버그유발(위에서 아래로 실행되도록 개발이 바람직) -> 함수표현식으로 변경
    const init = function() {
        store.commit('toDos', []); // 스토어 초기화
        loadToDos();
        store.state.toDos.forEach(toDo => renderTodo(toDo));
        renderCount(store.state.toDos.length); // 렌더링이 제일 비용소모가 크다 -> 한 번만 그리면 될 건 한 번만 그린다
        renderListBox();
        attachEvent();
    }

    const attachEvent = function() {
        // 폼 이벤트 보다는 키 이벤트가 바람직함 -> 구조변경에 유연하고, 범용적인 코드
        // 이벤트 로직과 서비스 로직 분리 -> 뷰, 뷰모델, 모델 분리 -> MVVM -> 다른 구조패턴 써도 된다
        document.querySelector('.new-todo').addEventListener('keyup', function(e) {
            if(e.keyCode !== 13) { return; } // 감시절 형태로 예외처리 -> 코드 가독성/안정성 증가
            e.preventDefault();
            // 실행흐름에서 보이는 데이터는 새로 뽑지 않는다 -> 그런건 이리저리 꼬여있는 스파게티 코드
            addTodo(e.currentTarget.value); // 이벤트에서 데이터 받아서 쓴다
            e.currentTarget.value = '';
        });
        document.querySelector('.toggle-all').addEventListener('click', function(e) {
            const toDoList = activeUlEl.querySelectorAll('li');
            const checkboxList = document.querySelectorAll('.todo-list .toggle');
            toggleAllToDo(toDoList, checkboxList);
        });
    }

    const loadToDos = function() {
        const loadedToDos = JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
        store.state.toDos.push(...loadedToDos); // 디스트럭쳐링
    }

    const saveTodos = function() {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(store.state.toDos));
        } catch(e) {
            // 스토리지 용량이 넘치면 예외뱉고 뻗는다 -> 방어로직 또는 에러얼럿 필요
        }
    }

    const getTodoCount = function() {
        return Number(toDoCountEl.textContent);
    }

    const addTodo = function(text) {
        if(text.length === 0) { return/* 0*/; } // 무의미한 특정값 리턴하지 않는다

        const toDo = { text: text, id: store.state.toDos.length + 1 }; // + 1 같은 로직은 유지보수 힘들다
        store.state.toDos.push(toDo);

        if(store.state.toDos.length === 1) {
            renderListBox(); // 불필요한 렌더링 하지 않는다 -> 상태체크 해서 정확히 필요한 시점에만 렌더링
        }
        renderTodo(toDo);
        renderCount(store.state.toDos.length);
        saveTodos(); // 렌더링과 무관한 로직은 제일 마지막에 수행한다 -> 성능향상 -> 여기서는 크지 않지만
    }

    const deleteToDo = function(li) {
        const deleteIndex = store.state.toDos.findIndex(toDo => toDo.id === parseInt(li.id));
        store.state.toDos.splice(deleteIndex, 1); // 참조를 변경하는 건 바람직하지 않음 -> 다른 참조변수가 있을 수 있음

        activeUlEl.removeChild(li);
        if(store.state.toDos.length === 0) {
            renderListBox(true); // 상태체크 해서 정확히 필요한 시점에만 렌더링
        }
        saveTodos();

        if(!li.classList.contains('completed')) {
            renderCount(getTodoCount() - 1);
        }
    }

    const checkedToDo = function(checkbox) {
        const check = checkbox.classList;
        check.toggle('completed');
        if(check.contains('completed')) {
            renderCount(getTodoCount() - 1);
        } else {
            renderCount(getTodoCount() + 1);
        }
    }

    const toggleAllToDo = function(toDoList, checkboxList) {
        // 전체 선택되면 체크상태 해제
        if(getTodoCount() === 0) {
            toDoList.forEach((item, i) => {
                checkboxList[i].checked = false;
                item.classList.remove('completed');
            });
            renderCount(toDoList.length);
            return/* 0*/; // 무의미한 특정값 리턴하지 않는다
        }

        // 체크 상태가 아니라면 체크상태로 만든다.
        toDoList.forEach((item, i) => {
            if(checkboxList[i].checked !== false) { return; }

            checkboxList[i].checked = true;
            item.classList.add('completed');
            renderCount(getTodoCount() - 1);
        });
    }

    // 한 줄 밖에 안 되지만, 명확하게 메소드로 분리한다 -> 유지보수성/확장성
    const renderCount = function(count) {
        toDoCountEl.textContent = count;
    }

    // 최초는 없으면 숨기는 게 아니라, 있으면 나타낸다 -> UX 측면에서도, 성능 측면에서도 바람직하지 않음
    const renderListBox = function(isDeleted) {
        if(store.state.toDos.length === 0 && isDeleted) {
            mainEl.style.display = 'none';
            footerEl.style.display = 'none';
            return;
        }
        if(store.state.toDos.length === 0) { return; }

        mainEl.style.display = '';
        footerEl.style.display = '';
    }

    // 렌더링 메소드는 순수하게 렌더링만 수행한다 -> 이외 로직은 전부 분리한다 -> 유지보수성/확장성
    const renderTodo = function({ id, text }) { // 디스트럭쳐링
        const li = document.createElement('li');
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        const button = document.createElement('button');

        button.addEventListener('click', function(e) {
            const li = event.target.parentNode.parentNode;
            deleteToDo(li);
        });
        input.addEventListener('click', function(e) {
            const checkbox = event.target.parentNode.parentNode;
            checkedToDo(checkbox);
        });

        li.id = id;
        div.classList.add('view');
        input.classList.add('toggle');
        input.setAttribute('type', 'checkbox');
        label.textContent = text;
        button.classList.add('destroy');

        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(button);

        li.appendChild(div);
        activeUlEl.appendChild(li);
    }

    return {
        'init' : init
    }
}());

// 심플하게 구현한 상태관리 객체 -> Flux패턴 중 순수하게 스토어만 구현되어 있음
// 상태를 객체의 외부에서 관리 -> 쓰기는 commit으로만 가능 -> 변경이력을 추적하기 쉬움 -> 유지보수성 좋음
// 읽기는 state로 가능 -> 값을 변경해도 원본값에 영향없음 -> 단, 참조형은 뮤터블임 -> 주소값만 임뮤터블
const store = (function() {
    const state = {};
    const commit = function(key, value) {
        state[key] = value;
    }

    return {
        'commit': commit,
        get state() {
            return Object.create(state);
        }
    }
}());

// TODO 필요하면 각 메소드를 서브모듈로 분리하거나 -> 객체지향 상속관계로 분리한다
// TODO 셀렉터나 속성명 등 하드코딩 유지함 -> 공통화하여 재사용할 수 있도록 한다
// TODO 주석제거 직전버전과 주석병합
// 저장소 충돌에 대한 예외처리 로직 필요할 듯
// 셀렉터들 분리 + 상대선택 필요할 듯
// getTodoCount 세부로직 수정 -> 돔에 접근하지 않도록 상태관리