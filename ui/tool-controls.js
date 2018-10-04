function addControls(container, groups) {
  if (!Array.isArray(groups[0])) {
    groups = [groups];
  }
  groups.forEach(controls => {
    let group = document.createElement('span');
    group.classList.add('ql-formats');
    group.classList.add('btn-group');
    controls.forEach(control => {
      if (typeof control === 'string') {
        addButton(group, control);
      } else {
        let format = Object.keys(control)[0];
        let value = control[format];
        if (Array.isArray(value)) {
          if (value.some(Array.isArray)) {
            makeSection(group, format, value);
          } else {
            addSelect(group, format, value);
          }
        } else {
          addButton(group, format, value);
        }
      }
    });
    container.appendChild(group);
  });
}

function addButton(container, format, value) {
  const input = document.createElement('button');
  input.setAttribute('type', 'button');
  input.classList.add(`ql-${format}`);
  input.classList.add('btn');
  if (value != null) {
    input.value = value;
  }
  container.appendChild(input);
}

function addSelect(container, format, values) {
  const input = document.createElement('select');
  input.classList.add(`ql-${format}`);
  values.forEach(value => {
    const option = document.createElement('option');
    if (value !== false) {
      option.setAttribute('value', value);
    } else {
      option.setAttribute('selected', 'selected');
    }
    input.appendChild(option);
  });
  container.appendChild(input);
}

function makeSection(section, format, values) {
  section.className = '';
  section.classList.add('ql-section');
  format.split(" ").forEach(className => section.classList.add('ql-' + className));

  addControls(section, values);

  return section;
}

export { addControls, addButton, addSelect, makeSection };
