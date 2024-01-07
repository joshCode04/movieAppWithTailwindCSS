export default function Footer() {
  return (
    <div className="mt-10 justify-center items-center">
      <div className="flex justify-center gap-14">
        <span className="text-[30px]">
          <ion-icon name="logo-facebook"></ion-icon>
        </span>
        <span className="text-[30px]">
          <ion-icon name="logo-instagram"></ion-icon>
        </span>
        <span className="text-[30px]">
          <ion-icon name="logo-linkedin"></ion-icon>
        </span>
        <span className="text-[30px]">
          <ion-icon name="logo-youtube"></ion-icon>
        </span>
      </div>
      <div className="text-center text-xl">
        <p className="hover:underline text-center">Condition of Use</p>
        <p className="hover:underline text-center">Privacy & Policy</p>
        <p className="hover:underline text-center">Press Room</p>
      </div>
      <div className="text-center">
        <p>© 2024 FilmFusion by Olumide Ayeromara</p>
      </div>
    </div>
  );
}
