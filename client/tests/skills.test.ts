import { describe, expect, it } from "vitest";

describe("Формирование плана занятий", () => {
  it("исключает освоенные навыки из плана", () => {
    const skills = [
      { id: 1, title: "Говорит простыми словами" },
      { id: 2, title: "Собирает пирамидку" },
      { id: 3, title: "Ходит самостоятельно" },
    ];

    const selectedSkills = [1, 3];

    const notSelectedSkills = skills.filter(
      (skill) => !selectedSkills.includes(skill.id),
    );

    expect(notSelectedSkills).toEqual([
      { id: 2, title: "Собирает пирамидку" },
    ]);
  });
});

it("возвращает пустой план, если все навыки освоены", () => {
  const skills = [
    { id: 1, title: "Говорит простыми словами" },
    { id: 2, title: "Собирает пирамидку" },
  ];

  const selectedSkills = [1, 2];

  const notSelectedSkills = skills.filter(
    (skill) => !selectedSkills.includes(skill.id),
  );

  expect(notSelectedSkills).toEqual([]);
});

it("оставляет в плане только неосвоенные навыки", () => {
  const skills = [
    { id: 1, title: "Говорит простыми словами" },
    { id: 2, title: "Собирает пирамидку" },
    { id: 3, title: "Ходит самостоятельно" },
  ];

  const selectedSkills = [1];

  const notSelectedSkills = skills.filter(
    (skill) => !selectedSkills.includes(skill.id),
  );

  expect(notSelectedSkills).toHaveLength(2);
});