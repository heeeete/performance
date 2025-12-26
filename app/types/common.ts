export interface PerformanceItem {
	/** 장르/카테고리 (예: "무용(서양/한국무용)") */
	cate: string;
	/** 순번 (예: 20) */
	rnum: number;
	/** 공연명 (예: "유니버설발레단, 호두까기인형") */
	prfnm: string;
	/** 공연기간 (예: "2025.12.17~2025.12.28") */
	prfpd: string;
	/** 공연일수 (예: 18) */
	prfdtcnt: number;
	/** 지역 (예: "서울") */
	area: string;
	/** 공연장명 (예: "세종문화회관 세종대극장") */
	prfplcnm: string;
	/** 좌석 수 (예: 3022) */
	seatcnt: number;
	/** 포스터 이미지 URL */
	poster: string;
	/** 공연 식별 ID */
	mt20id: string;
}

export interface PerformanceDetail {
	mt20id: string; // 공연 ID
	prfnm: string; // 공연명
	prfpdfrom: string; // 공연 시작일 (YYYY.MM.DD)
	prfpdto: string; // 공연 종료일 (YYYY.MM.DD)
	fcltynm: string; // 공연장명
	prfcast: string; // 출연진
	prfcrew: string; // 스태프
	prfruntime: string; // 공연시간
	prfage: string; // 관람등급
	entrpsnm: string; // 제작사
	entrpsnmP: string; // 주최
	entrpsnmA: string; // 주관
	entrpsnmH: string; // 후원
	entrpsnmS: string; // 기획/제작사 등 기타
	pcseguidance: string; // 티켓 가격 안내
	poster: string; // 포스터 이미지 URL
	sty: string; // 소개/내용
	area: string; // 지역
	genrenm: string; // 장르
	openrun: "Y" | "N"; // 오픈런 여부
	visit: "Y" | "N"; // 방문 가능 여부
	child: "Y" | "N"; // 아동 공연 여부
	daehakro: "Y" | "N"; // 대학로 공연 여부
	festival: "Y" | "N"; // 축제 여부
	musicallicense: "Y" | "N"; // 라이선스 뮤지컬 여부
	musicalcreate: "Y" | "N"; // 창작 뮤지컬 여부
	updatedate: string; // 정보 갱신일 (YYYY-MM-DD HH:mm:ss)
	prfstate: string; // 공연 상태 (예: 공연중, 공연예정, 공연종료)
	mt10id: string; // 공연장 ID
	dtguidance: string; // 공연 일정 안내
	styurls?: {
		// 공연 소개 이미지 URL 정보
		styurl: string | string[]; // 단일 또는 배열 형태일 수 있음 (KOPIS API 특성상)
	};
	relates?: {
		// 관련 링크 정보
		relate: RelateItem[] | RelateItem; // 단일 객체 또는 배열 형태일 수 있음
	};
}

export interface RelateItem {
	relatenm: string; // 관련 사이트명
	relateurl: string; // 관련 링크 URL
}

export interface MapData {
	fcltynm: string; // 시설명
	mt10id: string; // 시설 ID
	mt13cnt: number; // 공연장(소속 공간) 개수
	fcltychartr: string; // 시설 성격 (예: 공공, 민간 등)
	opende: number | string; // 개관연도
	seatscale: number | string; // 총 좌석 수
	telno: string; // 전화번호
	relateurl: string; // 홈페이지 URL
	adres: string; // 주소
	la: number; // 위도 (latitude)
	lo: number; // 경도 (longitude)

	// 편의시설 (Y/N)
	restaurant: "Y" | "N";
	cafe: "Y" | "N";
	store: "Y" | "N";
	nolibang: "Y" | "N";
	suyu: "Y" | "N";

	// 장애인 편의시설 (Y/N)
	parkbarrier: "Y" | "N"; // 장애인 주차시설
	restbarrier: "Y" | "N"; // 장애인 화장실
	runwbarrier: "Y" | "N"; // 장애인 통로
	elevbarrier: "Y" | "N"; // 장애인 엘리베이터

	parkinglot: "Y" | "N"; // 주차장 여부
}
