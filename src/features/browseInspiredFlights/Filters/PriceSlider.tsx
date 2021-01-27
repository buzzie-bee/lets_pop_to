import {
  Button,
  InputAdornment,
  OutlinedInput,
  Slider,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from './filtersSlice';
import { RootState } from '../../../redux/store';

const isNumeric = (str: string) => {
  const rx = new RegExp(/^\d+$/);
  return rx.test(str);
};

const setInitialValues = (priceRange: number[], highestPrice: number) => {
  if (priceRange.length === 2) {
    return priceRange;
  }
  if (highestPrice) {
    return [0, highestPrice];
  }
  return [0, 1000000];
};

export const PriceSlider = ({
  setShowSlider,
}: {
  setShowSlider: (showSlider: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const { priceRange, highestPrice } = useSelector(
    (state: RootState) => state.filters
  );
  const initialValues = setInitialValues(priceRange, highestPrice);
  const [value, setValue] = useState<number[]>(initialValues);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleTextFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    const fieldName = e.target.name;
    const [minVal, maxVal] = value;

    if (isNumeric(inputValue)) {
      const newValueInt = parseInt(inputValue);
      switch (fieldName) {
        case 'minPrice':
          setValue([newValueInt, maxVal]);
          break;
        case 'maxPrice':
          setValue([minVal, newValueInt]);
          break;
        default:
          return;
      }
    } else if (inputValue === '') {
      switch (fieldName) {
        case 'minPrice':
          setValue([0, value[1]]);
          break;
        case 'maxPrice':
          setValue([value[0], highestPrice]);
          break;
        default:
          return;
      }
    }
  };

  const handleTextFieldBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    const fieldName = e.target.name;
    const [minVal, maxVal] = value;

    if (isNumeric(inputValue)) {
      const newValueInt = parseInt(inputValue);
      if (newValueInt < highestPrice) {
        switch (fieldName) {
          case 'minPrice':
            if (newValueInt > maxVal) {
              const calcMax = newValueInt + Math.floor(highestPrice * 0.1);
              const newMax = calcMax < highestPrice ? calcMax : highestPrice;
              setValue([newValueInt, newMax]);
            }
            break;

          case 'maxPrice':
            if (newValueInt < minVal) {
              const calcMin = newValueInt - Math.floor(highestPrice * 0.1);
              const newMin = calcMin > 0 ? calcMin : 0;
              setValue([newMin, newValueInt]);
            }
            break;
          default:
            return;
        }
      } else {
        switch (fieldName) {
          case 'minPrice':
            setValue([highestPrice - 1, highestPrice]);
            break;

          case 'maxPrice':
            setValue([minVal, highestPrice]);
            break;
          default:
            return;
        }
      }
    }
  };

  const handleSubmit = () => {
    setShowSlider(false);
    // handleChange(value);
    dispatch(setPriceRange(value));
  };

  return (
    <div className="sliderContainer">
      <Typography variant="h6">Price range</Typography>
      <div className="sliderInnerContainer">
        <Slider
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          aria-labelledby="range-slider"
          max={highestPrice}
        />
      </div>
      <div className="priceInputContainer">
        <OutlinedInput
          // TODO implement automatic currency units
          startAdornment={<InputAdornment position="start">£</InputAdornment>}
          name="minPrice"
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldBlur}
          value={value[0]}
        />
        <OutlinedInput
          startAdornment={<InputAdornment position="start">£</InputAdornment>}
          name="maxPrice"
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldBlur}
          value={value[1]}
        />
      </div>
      <div className="sliderButtonContainer">
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
};
