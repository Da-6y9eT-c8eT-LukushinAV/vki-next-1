'use client';

import useGroups from '@/hooks/useGroups';
import useStudents from '@/hooks/useStudents';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups } = useGroups();
  const { students } = useStudents();

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => {
        const groupStudents = students.filter(s => (s.groupId ?? s.group?.id) === group.id);
        return (
          <div key={group.id}>
            <h2>{group.name}</h2>
            {groupStudents.length > 0 ? (
              <ul>
                {groupStudents.map((s) => (
                  <li key={s.id}>{`${s.lastName} ${s.firstName} ${s.middleName ?? ''}`.trim()}</li>
                ))}
              </ul>
            ) : (
              <i>Нет студентов</i>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Groups;
