/*
ID: alice.z2
LANG: JAVA
TASK: milk
*/

import java.util.*;
import java.io.*;

public class milk {
	public static void main(String[] args) throws IOException {
		Scanner in = new Scanner(new File("milk.in"));
		PrintWriter out = new PrintWriter(new File("milk.out"));

		int total = in.nextInt();
		int milkProduceNum = in.nextInt();
		TreeMap<Integer, Integer> milks = new TreeMap<>();

		for (int i = 0; i < milkProduceNum; i++) {
			milks.put(in.nextInt(), in.nextInt());
		}

		Set<Integer> keySet = milks.keySet();

		int cost = 0;
		// Integer keyIndex = 0;
		Iterator it = keySet.iterator();
		while(total > 0) {
			int key = (int) it.next();
			Integer value = milks.get(key);
			if (total >= value) {
				cost += key * value;
				total -= value;
			} else {
				cost += key * total;
				total -= total;
			}
			// keyIndex++;
		}

		out.println(cost);

		in.close();
		out.close();


	}
}