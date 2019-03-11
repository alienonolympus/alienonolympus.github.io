#! python3
# hw.py - Retrieves homework from moodle. Please change username and password on lines 24 and 25

# Import required modules
from time import sleep
from selenium import webdriver
import bs4
import numpy as np
import sys

# Setup browser (include path to geckodriver)
browser = webdriver.Firefox(executable_path=r'/bin/geckodriver')
browser.implicitly_wait(10)

# Login
print('')
print('[1/7] Accessing login page.................')
browser.get('http://dcszonline.dulwich-suzhou.cn/')

print('[2/7] Logging in...........................')
username_input = browser.find_element_by_id('username')
password_input = browser.find_element_by_id('password')

username_input.send_keys('username') # Insert username here
password_input.send_keys('password') # Insert password here
password_input.submit()

sleep(2)

# Get homework
print('[3/7] Accessing homeworks page.............')
browser.get('http://dcszonline.dulwich-suzhou.cn/blocks/homework/view.php?course=1')

print('[4/7] Waiting for homework table to load...')
homework_table = browser.find_element_by_id('ond_homework_list')

print('[5/7] Retreiving page soruce...............')
page_source = browser.page_source
bs_page_source = bs4.BeautifulSoup(page_source, 'html.parser')
#browser.quit()

print('[6/7] Retrieving homeworks.................')
homeworks = bs_page_source.select('.dataTables_scrollBody tbody tr td')

# Parse homework table
print('[7/7] Parsing homework table...............')
shape = (int(len(homeworks) / 8), 8)
hw_array = np.array([data.getText() for data in homeworks])
hw_matrix = hw_array.reshape(shape)

# Print incomplete homework
print('\nIncomplete Homework:\n')
incomplete = []
for hw in hw_matrix:
    if hw[4] != 'Completed':
        print('Subject: ', hw[1], ' || Assignment: ', hw[2], ' || Due Date: ', hw[7])
        incomplete.append(hw[2])

print('')

# Complete all incomplete homework
complete = input('Complete all? ')

if complete == 'y':
    print('')
    print('[1/1] Completing homework.................')
    for incomplete_hw in incomplete:
        browser.get('http://dcszonline.dulwich-suzhou.cn/blocks/homework/view.php?course=1')
        hw_link = browser.find_element_by_partial_link_text(incomplete_hw)
        hw_link.click()
        mark_as_done = browser.find_element_by_id('btnsubmit')
        mark_as_done.click()

sleep(5)

browser.quit()