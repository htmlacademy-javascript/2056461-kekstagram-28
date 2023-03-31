const imgScaleContainer = document.querySelector('.img-upload__scale');
const previewImage = document.querySelector('.img-upload__preview img');
const valueField = imgScaleContainer.querySelector('.scale__control--value');
const smallerButton = imgScaleContainer.querySelector('.scale__control--smaller');
const biggerButton = imgScaleContainer.querySelector('.scale__control--bigger');

smallerButton.addEventListener('click', () => {
  let value = parseInt(valueField.value, 10) - 25;
  if (value < 25) {
    value = 25;
  }
  valueField.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
});

biggerButton.addEventListener('click', () => {
  let value = parseInt(valueField.value, 10) + 25;
  if (value > 100) {
    value = 100;
  }
  valueField.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
});
