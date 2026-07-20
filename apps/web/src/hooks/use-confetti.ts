import confetti from 'canvas-confetti';
import React from 'react';

export function useConfetti(options: TConfettiOptions = {}): () => void {
	const {
		duration = 1500,
		interval = 250,
		spread = 360,
		startVelocity = 30,
		ticks = 60,
		zIndex = 100
	} = options;
	const timerRef = React.useRef<number | null>(null);

	const clearTimer = React.useCallback(() => {
		if (timerRef.current == null) {
			return;
		}

		window.clearInterval(timerRef.current);
		timerRef.current = null;
	}, []);

	React.useEffect(() => clearTimer, [clearTimer]);

	return React.useCallback(() => {
		clearTimer();

		if (
			duration <= 0 ||
			interval <= 0 ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return;
		}

		const animationEnd = Date.now() + duration;
		const defaults: confetti.Options = {
			disableForReducedMotion: true,
			spread,
			startVelocity,
			ticks,
			zIndex
		};
		const fireConfetti = () => {
			const timeLeft = animationEnd - Date.now();
			if (timeLeft <= 0) {
				clearTimer();
				return;
			}

			const particleCount = 50 * (timeLeft / duration);
			void confetti({
				...defaults,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				particleCount
			});
			void confetti({
				...defaults,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				particleCount
			});
		};

		timerRef.current = window.setInterval(fireConfetti, interval);
		fireConfetti();
	}, [clearTimer, duration, interval, spread, startVelocity, ticks, zIndex]);
}

export interface TConfettiOptions {
	duration?: number;
	interval?: number;
	spread?: number;
	startVelocity?: number;
	ticks?: number;
	zIndex?: number;
}

function randomInRange(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
