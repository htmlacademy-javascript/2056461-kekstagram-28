const effectsInputs = document.querySelectorAll('.effects__preview');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const preview = document.querySelector('.img-upload__preview');

noUiSlider.create (effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const getSliderSettings = () => {
  if (preview.classList.contains('effects__preview--chrome' || 'effects__preview--sepia')) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    });
  } else if (preview.classList.contains('effects__preview--marvin')) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    });
  } else if (preview.classList.contains('effects__preview--phobos')) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    });
  } else if (preview.classList.contains('effects__preview--heat')) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    });
  } else {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      connect: 'lower',
    });
  }
};

const getFilterSettings = (value) => {
  if (preview.classList.contains('effects__preview--chrome')) {
    preview.style.filter = `grayscale(${value})`;
  } else if (preview.classList.contains('effects__preview--sepia')) {
    preview.style.filter = `sepia(${value})`;
  } else if (preview.classList.contains('effects__preview--marvin')) {
    preview.style.filter = `invert(${value}%)`;
  } else if (preview.classList.contains('effects__preview--phobos')) {
    preview.style.filter = `blur(${value}px)`;
  } else if (preview.classList.contains('effects__preview--heat')) {
    preview.style.filter = `brightness(${value})`;
  } else {
    preview.style.filter = '';
  }
};

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  let value = effectLevelValue.value;
  value = values[handle];
  getFilterSettings(value);
});

function onFilterClick(evt) {
  preview.classList = `img-upload__preview ${evt.target.classList[1]}`;
  effectLevelValue.value = 100;
  effectLevelSlider.noUiSlider.set(100);
  getSliderSettings();

  if (preview.classList.contains('effects__preview--none')) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
}

const addFiltersEvent = () => {
  effectLevel.classList.add('hidden');
  effectsInputs.forEach((input) => {
    input.addEventListener('click', onFilterClick);
  });
};

const removeFiltersEvent = () => {
  effectsInputs.forEach((input) => {
    input.removeEventListener('click', onFilterClick);
  });

  preview.classList = 'img-upload__preview';
  preview.style.filter = '';
};

export {addFiltersEvent, removeFiltersEvent};
