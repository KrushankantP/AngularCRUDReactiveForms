import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const employees=[
      {
        "id": 1,
        "fullName": "Mark",
        "contactPreference": "email",
        "email": "mark@email.com",
        "phone": "5641238971",
        "skills": [
          {
            "skillName": "C#",
            "experienceInYears": 1,
            "proficiency": "beginner"
          },
          {
            "skillName": "Java",
            "experienceInYears": 2,
            "proficiency": "intermediate"
          }
        ]
      },
      {
        "id": 2,
        "fullName": "swami",
        "contactPreference": "phone",
        "email": "john@dell.com",
        "phone": "3242138971",
        "skills": [
          {
            "skillName": "Angular",
            "experienceInYears": "3",
            "proficiency": "intermediate"
          },
          {
            "skillName": "HTML",
            "experienceInYears": 2,
            "proficiency": "beginner"
          },
          {
            "skillName": "LINQ",
            "experienceInYears": 3,
            "proficiency": "advanced"
          }
        ]
      },
      {
        "id": 3,
        "fullName": "PATEL Kris",
        "contactPreference": "email",
        "email": "patel@dell.com",
        "phone": "7138032115",
        "skills": [
          {
            "skillName": "Angular",
            "experienceInYears": "2",
            "proficiency": "intermediate"
          },
          {
            "skillName": "C#",
            "experienceInYears": "2",
            "proficiency": "intermediate"
          },
          {
            "skillName": "JavaScript",
            "experienceInYears": "1",
            "proficiency": "beginner"
          },
          {
            "skillName": "ASP.net core",
            "experienceInYears": "2",
            "proficiency": "intermediate"
          }
        ]
      }
    ]
    return {employees};
  }
}
