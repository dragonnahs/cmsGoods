'use client';
import styles from './page.module.css';
export default function CardItem() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    if (target.dataset.testid !== 'card-item') return;
    const offSetX = e.clientX - rect.left - rect.width / 2;
    const offSetY = e.clientY - rect.top - rect.height / 2;
    target.style.transform = `perspective(1000px) rotateX(${-offSetY / 10}deg) rotateY(${-offSetX / 10}deg) scale3d(1, 1, 1)`;

    const innerTarget = target.querySelector(
      '[data-testid="card-item_wrap"]',
    ) as HTMLDivElement;

    const degress = Math.atan2(offSetY, offSetX) * (180 / Math.PI);

    innerTarget!.style.transform = ` rotate(${degress + 90}deg) translate(-50%, -50%)`;
    innerTarget!.style.opacity = `${Math.max(Math.abs(offSetX) / ((rect.width * 5) / 2), Math.abs(offSetY) / ((rect.height * 5) / 2))}`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const innerTarget = target.querySelector(
      '[data-testid="card-item_wrap"]',
    ) as HTMLDivElement;
    if (innerTarget) {
      innerTarget!.style.transform = `rotate(0deg) translate(-50%, -50%)`;
      innerTarget!.style.opacity = '0';
    }
  };

  return (
    <div
      data-testid="card-item"
      className={
        styles['card-item'] +
        ` text-white w-1/4 h-32 rounded ml-10 border-2 border-white`
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles['card-item_content']}>
        <h2>Card 1</h2>
        <p>Some content</p>
      </div>
      <div className={styles['card-item_wrap']}>
        <div
          data-testid="card-item_wrap"
          className={styles['card-item_wrap-content']}
        ></div>
      </div>
    </div>
  );
}
