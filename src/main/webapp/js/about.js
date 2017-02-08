
$(document).ready(function () {
	
	
	$(".terms_part").not(".blank").click(function() {
		$(".terms_modal_title").text(inputTermsTitle($(this).find("span").text()));
		$(".terms_modal_desc").text(inputTermsDesc($(this).find("span").text()));
		$(".terms_modal").slideDown(800);
	})
	
	$(".terms_part").not(".blank").hover(function() {
		$(this).css("background-color", "#"+Math.floor(Math.random()*16777215).toString(16));
	}, function() {
		$(this).css("background-color","white");
	})
	
	
	$(".terms_modal_close span").click(function() {
		$(".terms_modal").slideUp(800);
	})
	
	$(".blank").click(function() {
		$(".terms_modal").slideUp(800);
	})
	
	
	$(".rules_part").click(function() {
		for (var i = 1; i <= 7; i++) {
			if($(".carousel-inner div:nth-child("+i+")").find("h3").text() === $(this).find("span").text()) {
				$(".carousel-inner div:nth-child("+i+")").addClass("active");
			} else {
				$(".carousel-inner div:nth-child("+i+")").removeClass("active");
			}
		}
		$(".rules_modal").slideDown(800);
	})
	
	$(".rules_modal_close span").click(function() {
		$(".rules_modal").slideUp(800);
	})
	
	
	
	
	$('.carousel').carousel({
	  interval: 0
	})
	
	
	function inputTermsTitle(title) {
		switch(title) {
		case "더블 드리블" :
			return "더블 드리블(double dribble)";
		case "더블 파울" :
			return "더블 파울(double foul)";
		case "데드 볼" :
			return "데드 볼(dead ball)";
		case "도지" :
			return "도지(dodge)";
		case "루스 볼" :
			return "루스 볼(loose ball)";
		case "맨투맨 디펜스" :
			return "맨투맨 디펜스(man to man defense)";
		case "멀티플 파울" :
			return "멀티플 파울(multiple foul)";
		case "바이얼레이션" :
			return "바이얼레이션(violation)";
		case "백 코트" :
			return "백 코트(back court)";
		case "백패스 룰" :
			return "백패스 룰(back pass rule)";
		case "30초 룰" :
			return "30초 룰(Thirty second rule)";
		case "3초 룰" :
			return "3초 룰(Three second rule)";
		case "센터 토스" :
			return "센터 토스(center toss)";
		case "스크린 플레이" :
			return "스크린 플레이(screen play)";
		case "스톨링" :
			return "스톨링(stalling)";
		case "점프 볼" :
			return "점프 볼(jump ball)";
		case "존 디펜스" :
			return "존 디펜스(zone defense)";
		case "트래블링" :
			return "트래블링(traveling)";
		case "포스트 플레이" :
			return "포스트 플레이(post play)";
		case "프론트 코트" :
			return "프런트 코트(front court)";
		case "피벗" :
			return "피벗(pivot)";
		case "헬드 볼" :
			return "헬드 볼(held ball)";
		}
	}
	
	function inputTermsDesc(title) {
		switch(title) {
		case "더블 드리블" :
			return "한 번 드리블을 끝낸 다음 계속하여 드리블을 하거나 양손으로 동시에 드리블하는 반칙.";
		case "더블 파울" :
			return "양팀의 경기자가 거의 동시에 퍼스널 파울을 범한 경우.";
		case "데드 볼" :
			return "공이 바스켓에 들어갔을 때 또는 심판의 휘슬로 잠시 경기가 중단된 상태.";
		case "도지" :
			return "풋워크를 교묘하게 구사하여 상대편 선수 사이를 빠져나가는 것.";
		case "루스 볼" :
			return "어느 편에도 속하지 않는 공.";
		case "맨투맨 디펜스" :
			return "대인방어. 즉 각 선수마다 상대편 선수 한 사람씩을 정하여 책임을 지고 수비하는 방법.";
		case "멀티플 파울" :
			return "한 팀의 선수 두 명 이상이 거의 동시에 범하는 퍼스널 파울.";
		case "바이얼레이션" :
			return "파울 이외의 규칙 위반. 벌칙으로 상대편에게 공격권을 준다.";
		case "백 코트" :
			return "엔드 라인에서 중앙선 앞쪽까지의 코트의 절반으로, 수비 팀에 속한 부분.";
		case "백패스 룰" :
			return "공을 가지고 있는 팀이 프런트 코트로부터 공을 되돌려 보낼 수 없는 규칙.";
		case "30초 룰" :
			return "공을 가진 팀이 30초 이내에 필드 스로를 해야 하는 규칙.";
		case "3초 룰" :
			return "공을 가지고 상대편의 프리스로 라인 안에서 3초 이상 머물지 못하는 규칙. 스리세컨드 룰.";
		case "센터 토스" :
			return "경기 시작 때 센터서클에서 양팀 센터 중앙 위로 공을 올려 주는 것.";
		case "스크린 플레이" :
			return "상대방이나 자기편 선수를 방패 삼아 상대방의 플레이를 지능적으로 방해하는 플레이.";
		case "스톨링" :
			return "득점이 많은 팀이 공을 빙빙 돌려 가며 소극적인 패스로 시간을 끌어 승리하는 전법. 지연 작전.";
		case "점프 볼" :
			return "게임의 개시 또는 더블 파울일 때, 프리스로가 끝난 후 헬드 볼을 할 때나 공의 소속이 불확실할 때 점프서클 안에서 두 선수가 심판이 올려 준 공을 점프하여 빼앗는 일.";
		case "존 디펜스" :
			return "골인되는 것을 막기 위해 수비 위치를 정해 두는 지역방어.";
		case "트래블링" :
			return "공을 가지고 3보 이상 걷는 동작. 워킹 또는 캐링볼이라고도 함.";
		case "포스트 플레이" :
			return "프리스로 라인 주변에 배치한 장신선수를 중심으로 하는 공격법.";
		case "프론트 코트" :
			return "상대팀의 바스켓 뒤쪽 엔드 라인에서 센터 라인에 가까운 쪽 코트 부분.";
		case "피벗" :
			return "한 발을 붙이고 다른 발로 상대의 수비를 피해 회전하거나 방향을 바꾸는 동작.";
		case "헬드 볼" :
			return "양 팀의 선수가 동시에 공을 잡았을 경우나 공격자가 상대방의 근접 마크로 인해 플레이를 하려는 뚜렷한 동작 없이 5초가 지났을 경우. 이때 심판은 점프 볼을 선언한다.";
		}
	}
	
});





