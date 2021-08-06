import React, { Component, useState } from 'react';

class PopUp extends Component {
    render() {
        // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
        const {open, close, header} = this.props;

        return (
            <div className={ open ? 'openModal modal': 'modal' }>
                { open ? (  
                    <section>
                        <header class="popUpTitle">
                            <button className="close" onClick={close}> &times; </button>
                        </header>
                        <div class="exProfile"></div>
                        <span class="arrow1">
                            &rarr;
                        </span>
                        <div class ="howTo1">
                            프로필 확인
                        </div>

                        <div class="exToggle"></div>
                        <span class="arrow2">
                            &rarr;
                        </span>
                        <div class ="howTo2">
                            + 메뉴를 클릭하면<br />
                            drag & drop 방식으로 <br />
                            위치와 크기 모두 조정할 수 있는 <br />
                            보드 생성 가능
                        </div>
                        
                        <div class="exSet"></div>
                        <span class="arrow3">
                            &rarr;
                        </span>
                        <div class ="howTo3">
                            개인 설정 페이지로 이동
                        </div>

                        <div class="exPopUp"></div>
                        <span class="arrow4">
                            &rarr;
                        </span>
                        <div class ="howTo4">
                            현재 페이지 보기
                        </div>
                    </section>
                ) : null }
            </div>
        )
    }
}

export default PopUp;