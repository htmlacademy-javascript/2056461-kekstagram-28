const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const imgScaleContainer = document.querySelector('.img-upload__scale');
const previewImage = document.querySelector('.img-upload__preview img');
const valueField = imgScaleContainer.querySelector('.scale__control--value');

imgScaleContainer.addEventListener('click', (evt) => {
  let value = parseInt(valueField.value, 10);
  if (evt.target.matches('.scale__control--smaller')) {
    value -= SCALE_STEP;
  }
  if (evt.target.matches('.scale__control--bigger')) {
    value += SCALE_STEP;
  }
  value = value < SCALE_MIN ? SCALE_MIN : value;
  value = value > SCALE_MAX ? SCALE_MAX : value;
  valueField.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
});
