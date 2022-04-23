const container = document.getElementById('container');
const arrow = container.querySelector('.arrow');
const dot = container.querySelector('.dot');
const dragState = {
	onDrag: false,
	startPos: { x: 0, y: 0 },
	dot: { w: 0, h: 0 }
}

const setDragState = () => {
	dragState.onDrag = true;
	const { width, height, top, left } = dot.getBoundingClientRect();
	dragState.startPos = { x: left, y: top };
	dragState.dot = { w: width / 2, h: height / 2 };
}

const resetDragState = () => {
	if (!dragState.onDrag) return;
	dragState.onDrag = false;
	dragState.startPos = { x: 0, y: 0 };
	dragState.dot = { w: 0, h: 0 };
}

const drawRect = (ev) => {
	if (!dragState.onDrag) {
		return;
	}
	const height = Math.floor(
		Math.sqrt(
			Math.pow(ev.pageX - (dragState.startPos.x + dragState.dot.w), 2) +
			Math.pow(ev.pageY - (dragState.startPos.y + dragState.dot.h), 2)
		)
	);
	const x = ev.pageX - dragState.startPos.x - dragState.dot.w;
	const y = ev.pageY - dragState.startPos.y - dragState.dot.h;
	const angle = Math.atan2(x, y) * 180 / Math.PI;
	requestAnimationFrame(() => {
		arrow.style.height = `${height < 20 ? 20 : height}px`;
		arrow.style.transform = `rotate(${angle * -1}deg)`;
	})
}

dot.addEventListener('mousedown', setDragState, false);
document.addEventListener('mousemove', drawRect);
document.addEventListener('mouseup', resetDragState);