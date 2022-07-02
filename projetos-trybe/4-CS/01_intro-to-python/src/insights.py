from src.jobs import read
# from jobs import read


def get_unique_job_types(path):
    """Checks all different job types and returns a list of them"""
    result = []
    jobs_data_array = read(path)
    all_jobs_types = [job["job_type"] for job in jobs_data_array]

    for job_type in all_jobs_types:
        if job_type not in result:
            result.append(job_type)

    return result


def filter_by_job_type(jobs, job_type):
    """Filters a list of jobs by job_type"""
    return [job for job in jobs if job["job_type"] == job_type]


def get_unique_industries(path):
    """Checks all different industries and returns a list of them"""
    result = []
    jobs_data_array = read(path)
    all_jobs_industries = [job["industry"] for job in jobs_data_array]

    for job_industry in all_jobs_industries:
        if job_industry not in result:
            result.append(job_industry)

    return list(filter(None, result))


def filter_by_industry(jobs, industry):
    """Filters a list of jobs by industry"""
    return [job for job in jobs if job["industry"] == industry]


def get_max_salary(path):
    """Get the maximum salary of all jobs"""
    max_salaries = []
    jobs_data_array = read(path)
    all_jobs_max_salary = [job["max_salary"] for job in jobs_data_array]

    for job_max_salary in all_jobs_max_salary:
        if job_max_salary != "" and job_max_salary.isdigit():
            max_salaries.append(int(job_max_salary))

    return max(max_salaries)


def get_min_salary(path):
    """Get the minimum salary of all jobs"""
    min_salaries = []
    jobs_data_array = read(path)
    all_jobs_min_salary = [job["min_salary"] for job in jobs_data_array]

    for job_min_salary in all_jobs_min_salary:
        if job_min_salary != "" and job_min_salary.isdigit():
            min_salaries.append(int(job_min_salary))

    return min(min_salaries)


def matches_salary_range(job, salary):
    """Checks if a given salary is in the salary range of a given job"""
    if "max_salary" not in job or "min_salary" not in job:
        raise ValueError("Dicionário 'job' incompleto :(")

    if type(job["max_salary"]) != int or type(job["min_salary"]) != int:
        raise ValueError("Dicionário 'job' apresenta um valor não numérico :(")

    if int(job["min_salary"]) > int(job["max_salary"]):
        raise ValueError("A 'min_salary' é maior que 'max_salary' :(")

    if type(salary) != int:
        raise ValueError("Parâmetro 'salary' é um valor não numérico :(")

    return int(job["min_salary"]) <= int(salary) <= int(job["max_salary"])


def filter_by_salary_range(jobs, salary):
    """Filters a list of jobs by salary range"""
    result = []
    for job in jobs:
        try:
            if matches_salary_range(job, salary):
                result.append(job)
        except ValueError:
            print("err")
    return result
