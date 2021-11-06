export function getDirtyValues(form: any) {
  let dirtyValues: any = {};

  Object.keys(form.controls).forEach((key) => {
    let currentControl = form.controls[key];

    if (currentControl.dirty) {
      if (currentControl.controls)
        dirtyValues[key] = getDirtyValues(currentControl);
      else dirtyValues[key] = currentControl.value;
    }
  });

  return dirtyValues;
}

export function formatNumbers(number: number | string) {
  return +number < 10 ? `0${number}` : number;
}

export function legalDate() {
  const date = new Date();
  const year = date.getFullYear() - 18;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${formatNumbers(month)}-${formatNumbers(day)}`;
}
